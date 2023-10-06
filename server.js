const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const driversRoute = require('./routes/DriverRoute');
const busRoutesRoute = require('./routes/RouteforBusRoute'); // Import your busRoutes routes
const busSchedulesRouter = require('./routes/BusSchedulesRoute'); // Import your busSchedules routes
const localPassengersRouter = require('./routes/localPassengersRoute'); // Import your localPassengers routes
const busInspectorsRouter = require('./routes/BusInspectorsRoute'); // Import your busInspectors routes
const busesRoute = require('./routes/BusRoute'); // Import busroute routes
const passengerTravelHistoryRoutes = require('./routes/PassengerTravelHistoryRoute'); // Replace with the actual path
const transportManagerRoute = require('./routes/TransportManagerRoute'); // Replace with the actual path

const app = express();
const db = require('./db')
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use('/api/driver', driversRoute);
app.use('/api/busroutes', busRoutesRoute);
app.use('/api/bus-schedules', busSchedulesRouter);
app.use('/api/localpassengers', localPassengersRouter);
app.use('/api/businspectors', busInspectorsRouter);
app.use('/api/bus', busesRoute);
app.use('/api/travelhistory', passengerTravelHistoryRoutes);
app.use('/api/bus', busesRoute);
app.use('/api/manager', transportManagerRoute);

app.get("/", (req, res) => {
    const authors = [
        { name: "Darshi Buddhini", github: "https://github.com/darshibuddhini" },
        { name: "Kimuthu Gamage", github: "https://github.com/kimuthuug" },
        { name: "Dinithi Mendis", github: "https://github.com/dinithi27" },
        { name: "Imesh Pasinda", github: "https://github.com/imeshpasinda" }
    ];

    const authorList = authors.map(author => `
        <p class="author">
            <a href="${author.github}" target="_blank" style="text-decoration: none; color: inherit;">${author.name}</a>
        </p>
    `).join('');

    const mitLicenseText = `
    ---Question 1-----

CREATE OR REPLACE TYPE Empl_typ AS OBJECT 
(
 empNo INT,
 empName VARCHAR2(50),
 salary FLOAT,
 designation VARCHAR2(50)
);
/

CREATE OR REPLACE TYPE Member_typ AS OBJECT
(
 team_member REF Empl_typ
);
/

CREATE TYPE Member_nt AS TABLE OF Member_typ;
/

CREATE TYPE Project_typ AS OBJECT
(
 projNo INT,
 pname VARCHAR2(50),
 members Member_nt,
 mgr REF Empl_typ
);
/

CREATE TABLE Employees OF Empl_typ(PRIMARY KEY(empNo));

CREATE TABLE Projects OF Project_typ(PRIMARY KEY (projNo), mgr REFERENCES Employees)
NESTED TABLE members STORE AS member_tab;

INSERT INTO Employees VALUES (1, 'Sarath', 10000.0, 'Technician');
INSERT INTO Employees VALUES (2, 'Sampath', 12000.0, 'Sales Officer');
INSERT INTO Employees VALUES (3, 'Viraj', 18000.0, 'Software Developer');
INSERT INTO Employees VALUES (4, 'Tusith', 22000.0, 'Director');
INSERT INTO Employees VALUES (5, 'Nimali', 15000.0, 'Technician');

INSERT INTO Projects VALUES (10, 'Cabling Project', 
member_nt(
Member_typ((select ref(e) from Employees e where e.empNo=1)),
Member_typ((select ref(e) from Employees e where e.empNo=5))),  
null);
 
INSERT INTO Projects VALUES (12, 'Data Warehousing Proj', 
member_nt(
Member_typ((select ref(e) from Employees e where e.empNo=2)),
Member_typ((select ref(e) from Employees e where e.empNo=3)),
Member_typ((select ref(e) from Employees e where e.empNo=4))),  
(select ref(e) from Employees e where e.empNo=2)
);


Consider the database script is given. Execute it to create the appropriate schema required for the practical test.

Write Oracle’s Object SQL statements to the following:

---------1---------
Print the project number, project name and project manager’s salary.  The results should be printed is descending order of salary values.

SELECT p.projNo, p.pname, m.team_member.salary
FROM Projects p
JOIN Employees m ON p.mgr = REF(m)
ORDER BY m.salary DESC;

---------2---------
Write a member method (called Budget) that finds returns the total salary of all members in the project.

CREATE OR REPLACE TYPE Project_typ AS OBJECT
(
  projNo INT,
  pname VARCHAR2(50),
  members Member_nt,
  mgr REF Empl_typ,
  
  MEMBER FUNCTION Budget RETURN FLOAT
);
/


CREATE OR REPLACE TYPE BODY Project_typ AS
  MEMBER FUNCTION Budget RETURN FLOAT IS
    totalSalary FLOAT := 0.0;
  BEGIN
    FOR i IN 1..self.members.COUNT LOOP
      totalSalary := totalSalary + self.members(i).team_member.empNo.salary;
    END LOOP;
    
    RETURN totalSalary;
  END;
END;
/



---------3----------
Use the method created above to find the project with the least budget greater than 20000. Print the projNo.

SELECT projNo
FROM Projects
WHERE Budget() > 20000
ORDER BY Budget()
FETCH FIRST 1 ROW ONLY;



-----Question 2-----

create type account_type_typ as object (
 code char(4),
 name varchar2(50),
 interest float,
 min_bal float
);
/

create type account_typ as object (
 account_no char(10),
 account_ty ref account_type_typ,
 balance float
);
/

create type account_tlb as table of account_typ;
/

create table account_types of account_type_typ (code primary key);

create type customer_typ as object (
 id char(10),
 name varchar2(50),
 accounts account_tlb
);
/

create table customers of customer_typ(id primary key)
 nested table accounts store as ntlb_accounts;

insert into account_types values ('SAVS', 'General Savings', 5.24, 100.0);
insert into account_types values ('CHEQ', 'General Checking', 0.0, 0);
insert into account_types values ('HAPS', 'Hapan Savings', 6.26, 20000.0);


insert into customers values (
 '781250401V',
 'Sampath Weerasinghe',
 account_tlb(
  account_typ('1122300004',
            (select ref(s) from account_types s where s.code = 'SAVS'), 5700.00),
  account_typ('2334453124',
            (select ref(s) from account_types s where s.code = 'CHEQ'), 2300.00)
 )
);

insert into customers values (
 customer_typ (
  '99334453V', 'Dulani Pieris',
  account_tlb(
   account_typ('3445663321',
            (select ref(s) from account_types s where s.code = 'HAPS'), 19045.06),
   account_typ('5000022123',
            (select ref(s) from account_types s where s.code = 'SAVS'), 55235.00)
  )
 )
);


1)Deposit Rs. 1200/- to the account (Acc # 1122300004) of Mr. Sampath Weerasignhe (ID # 781250401V)

UPDATE TABLE(SELECT c.accounts FROM customers c WHERE c.id = '781250401V') a
SET a.balance = a.balance + 1200
WHERE a.account_no = '1122300004';

2)Write a member function (called TotBal) that returns the total balance of a customer’s accounts.

CREATE OR REPLACE TYPE customer_typ AS OBJECT (
  id CHAR(10),
  name VARCHAR2(50),
  accounts account_tlb,
  MEMBER FUNCTION TotBal RETURN FLOAT
);
CREATE OR REPLACE TYPE BODY customer_typ AS
  MEMBER FUNCTION TotBal RETURN FLOAT IS
    total_balance FLOAT := 0;
  BEGIN
    FOR i IN 1..self.accounts.COUNT LOOP
      total_balance := total_balance + self.accounts(i).balance;
    END LOOP;
    RETURN total_balance;
  END TotBal;
END;
/

3)Write a query to print the names of customers and their total balances (using the function created in question 2)

SELECT c.name, c.accounts.TotBal() AS total_balance
FROM customers c;
    
    `;

    const responseMessage = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: 'Helvetica', sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    text-align: center;
                    margin: 50px auto;
                    max-width: 800px;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .title {
                    font-size: 10px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 20px;
                }
                .status {
                    font-size: 16px;
                    color: green;
                    margin-bottom: 10px;
                }
                .author {
                    font-size: 14px;
                    color: #555;
                    margin: 5px 0;
                }
                .license {
                    margin-top: 20px;
                    white-space: pre-line;
                    font-size: 12px;
                    color: #777;
                    text-align: left; 
                    width: 100%; 
                }
                
                .logo {
                    display: block;
                    margin: 0 auto;
                    width: 150px;
                }
                .repo-link {
                    font-size: 12px; /* Reduce the font size for the repository link */
                }
            </style>
        </head>
        <body>
            <div class="container">
               
               
                
                <div class="license">
                    ${mitLicenseText}
                </div>
                
            </div>
        </body>
        </html>
    `;

    res.send(responseMessage);
});







const port = process.env.PORT || 8070;

app.listen(port, () => `Server is up and running on port number: ${port}`);