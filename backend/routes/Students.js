const router = require("express").Router();
const { response } = require("express");
let Student = require("../models/Student");

//enter the studetns data
router.route("/addStudent").post((req, res) => {
  const fullName = req.body.fullName;
  const address = req.body.address;
  const district = req.body.district;
  const province = req.body.province;
  const gender = req.body.gender;
  const birthday = req.body.birthday;
  const nic = req.body.nic;
  const uniRegNo = req.body.uniRegNo;
  const faculty = req.body.faculty;
  const yearOfStudy = req.body.yearOfStudy;
  const distance = req.body.distance;
  const contactNo = req.body.contactNo;
  const email = req.body.email;
  const medicalHistory = req.body.medicalHistory;
  const emergencyContactName = req.body.emergencyContactName;
  const emergencyContactPhone = req.body.emergencyContactPhone;

  const newStudent = new Student({
    fullName,
    address,
    district,
    province,
    gender,
    birthday,
    nic,
    uniRegNo,
    faculty,
    yearOfStudy,
    distance,
    contactNo,
    email,
    medicalHistory,
    emergencyContactName,
    emergencyContactPhone,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Read all students data

router.route("/").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete all the students data

router.route("/deleteall/").delete((req, res) => {
  Student.deleteMany()
    .then(() => {
      res.status(200).send({ status: "Deleted All" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with deleting user", error: err.message });
    });
});

//Update 1 student by id

router.route("/update/:id").put(async (req, res) => {
  let userid = req.params.id;
  const {
    fullName,
    address,
    district,
    province,
    gender,
    birthday,
    nic,
    uniRegNo,
    faculty,
    yearOfStudy,
    distance,
    contactNo,
    email,
    medicalHistory,
    emergencyContactName,
    emergencyContactPhone,
  } = req.body;

  const updateStudent = {
    fullName,
    address,
    district,
    province,
    gender,
    birthday,
    nic,
    uniRegNo,
    faculty,
    yearOfStudy,
    distance,
    contactNo,
    email,
    medicalHistory,
    emergencyContactName,
    emergencyContactPhone,
  };

  const update = await Student.findByIdAndUpdate(userid, updateStudent)
    .then(() => {
      res.status(200).send({ status: "User Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//password add

router.route("/addpswd").put(async (req, res) => {
  const { passwords } = req.body;

  try {
    for (const { userid, password } of passwords) {
      const passwordadd = { password };
      await Student.findByIdAndUpdate(userid, passwordadd);
    }

    res.status(200).send({ status: "Users Updated" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: "Error with updating data", error: err.message });
  }
});

//Delete 1 user by id

router.route("/delete/:id").delete(async (req, res) => {
  let userid = req.params.id;

  await Student.findByIdAndDelete(userid)
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting user", error: err.message });
    });
});

//Display 1 user data

router.route("/get/:id").get((req, res) => {
  let userid = req.params.id;
  //if you want to search by nic number
  //await Student.findOne(nic)

  Student.findById(userid)
    .then((Student) => {
      res.status(200).send({ status: "User fetched", Student });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with getting user details" });
    });
});

module.exports = router;
