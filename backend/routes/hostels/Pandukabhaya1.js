const router = require("express").Router();
const Pandukabhaya1 = require("../../models/hostels/Pandukabhaya1");

router.route("/regToRoom").post(async (req, res) => {
  const roomNo = req.body.selectedRoom;
  const studentName = req.body.student.Name;
  const uniqNumber = req.body.student.uniqno;

  try {
    const existingRecord = await Pandukabhaya1.findOne({ roomNo });

    if (existingRecord) {
      // Update the existing record with the new student
      existingRecord.students.push({ name: studentName, uniqno: uniqNumber });
      await existingRecord.save();
      res.json("Student registered successfully!");
    } else {
      // Create a new record if the room doesn't exist
      const newPandukabhaya1 = new Pandukabhaya1({
        roomNo,
        students: [{ name: studentName, uniqno: uniqNumber }],
      });

      await newPandukabhaya1.save();
      res.json("Room and student registered successfully!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error registering student to the room");
  }
});

module.exports = router;

//get all room details

router.route("/gethosteldetails").get((req, res) => {
  Pandukabhaya1.find()
    .then((hosteldetails) => {
      res.json(hosteldetails);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete all room records
router.route("/deleteallrooms/").delete((req, res) => {
  Pandukabhaya1.deleteMany()
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

//delete 1 student
router.route("/deleteStudent/:roomNo/:studentId").delete(async (req, res) => {
  const roomNo = req.params.roomNo;
  const studentId = req.params.studentId;

  try {
    const existingRecord = await Pandukabhaya1.findOne({ roomNo });

    if (existingRecord) {
      // Find the index of the student with the given ID
      const studentIndex = existingRecord.students.findIndex(
        (student) => student._id.toString() === studentId
      );

      if (studentIndex !== -1) {
        // Remove the student from the array
        existingRecord.students.splice(studentIndex, 1);

        // Save the updated record
        await existingRecord.save();

        res.json("Student deleted successfully!");
      } else {
        res.status(404).json("Student not found in the room");
      }
    } else {
      res.status(404).json("Room not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error deleting student from the room");
  }
});
