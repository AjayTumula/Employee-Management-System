import express from "express";
import connection from "../database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
const router = express.Router();
const salt = 10;
app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      expires: 60 * 60 * 24,
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// Route to check if email exists
router.get("/check_email/:email", (req, res) => {
  const email = req.params.email;
  const sql = "SELECT * FROM user_login WHERE email = ?";
  connection.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length > 0) {
      return res.json({ exists: true });
    } else {
      return res.json({ exists: false });
    }
  });
});

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    // SQL query to insert user data into the database
    const sql = `INSERT INTO user_login (email, password, name) VALUES (?,?,?)`;
    const result = await new Promise((resolve, reject) => {
      connection.query(
        sql,
        [email, hashedPassword, username],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    // Respond with success status and result
    res.status(200).json({ Status: true, Result: result });
  } catch (error) {
    // Handle errors
    console.error("Error during registration:", error);
    res.status(500).json({ Status: false, Error: "Internal Server Error" });
  }
});

router.post("/login", (req, res) => {
  const sql = `SELECT * FROM user_login WHERE email = ?`;
  try {
    connection.query(sql, [req.body.email], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ auth: false, error: "Database error" });
      }
      if (result.length > 0) {
        bcrypt.compare(
          req.body.password,
          result[0].password,
          (err, response) => {
            if (err) {
              console.error("Password comparison error:", err);
              return res
                .status(500)
                .json({ auth: false, error: "Internal server error" });
            }
            if (response) {
              const email = result[0].email;
              const token = jwt.sign(
                { role: "admin", email: email, id: result[0].id },
                "jwtSecret",
                {
                  expiresIn: "1d",
                }
              );
              res.cookie("token", token);
              return res.json({ auth: true });
            } else {
              return res
                .status(401)
                .json({ auth: false, error: "Wrong password" });
            }
          }
        );
      } else {
        return res.status(404).json({ auth: false, error: "User not found" });
      }
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res
      .status(500)
      .json({ auth: false, error: "Unexpected error occurred" });
  }
});

// Route to fetch logged-in user profile details
router.get("/profile", verifyToken, (req, res) => {
  const userId = req.user.id; // Extracted from verified token
  const sql = "SELECT id, name, email FROM user_login WHERE id = ?";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
    };
    res.json({ user });
  });
});

// Function to verify JWT token
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  jwt.verify(token, "jwtSecret", (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).json({ error: "Unauthorized" });
    }
    req.user = decoded; // Decoded payload contains user information
    next();
  });
}

router.get("/login", (req, res) => {
  const sql = "SELECT * FROM user_login WHERE email = ?";
});

router.get("/department", (req, res) => {
  const sql = "SELECT * FROM department";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_department", (req, res) => {
  const sql = "INSERT INTO department (`name`) VALUES (?)";
  connection.query(sql, [req.body.name], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

router.get("/department/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM department WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

// GET route to check if department exists by name
router.get("/check_department/:name", (req, res) => {
  const departmentName = req.params.name;
  const sql = "SELECT * FROM department WHERE name = ?";
  connection.query(sql, [departmentName], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length > 0) {
      // Department with the given name exists
      res.json({ exists: true });
    } else {
      // Department with the given name does not exist
      res.json({ exists: false });
    }
  });
});

router.put("/edit_department/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE department set name= ? Where id= ?`;
  const value = [req.body.name];
  connection.query(sql, [...value, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_department/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from department where id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_employee", (req, res) => {
  const sql = `INSERT INTO employee_data (name, email, jobtitle, address, department_id) VALUES (?)`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.jobtitle,
    req.body.address,
    req.body.department_id,
  ];
  connection.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json({ Status: true });
  });
});

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee_data";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee_data WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee_data set name= ?, email= ?, jobtitle= ?, address= ?, department_id= ? Where id= ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.jobtitle,
    req.body.address,
    req.body.department_id,
  ];
  connection.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee_data where id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employee_data";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/department_count", (req, res) => {
  const sql = "select count(id) as department from department";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as UserRouter };
