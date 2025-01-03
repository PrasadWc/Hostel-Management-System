import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Hostels() {
  const navigate = useNavigate();
  const [hostelData, setHostelData] = React.useState([]);
  const [stdcount, setStdCount] = React.useState(0);

  React.useEffect(() => {
    // Fetch data from the backend API
    axios
      .get("http://localhost:3010/hostels/gethosteldetails")
      .then((response) => {
        setHostelData(response.data);

        // Calculate total student count
        let totalStudentCount = 0;
        response.data.forEach((room) => {
          const students = room.students;
          totalStudentCount += students ? students.length : 0;
        });

        console.log(`Total Student Count: ${totalStudentCount}`);
        setStdCount(totalStudentCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCardClick = (cardTitle) => {
    // Add your click logic here, for example, navigate to a new page or perform an action
    console.log(`Clicked on card with title: ${cardTitle}`);
  };

  const handleViewDetails = (hostelName) => {
    // Use navigate to navigate to the specified path
    navigate(`/adminpanel/hostels/${hostelName}`);
  };

  const cardStyle = { width: "400px", height: "400px", margin: "10px" }; // 345 * 1.5
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    width: "80%",
    margin: "0 auto", // Center the container horizontally
  };

  return (
    <div>
      <div style={containerStyle}>
        <div>
          <Card sx={cardStyle} onClick={() => handleCardClick("Lizard 2")}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="frontend/src/components/AdminPanel/2.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Pandukabhaya 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hostel Capacity: 60
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Filled Student Count: {stdcount}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => handleViewDetails("Pandukabhaya1")}
              >
                View Hostel Details
              </Button>
            </CardActions>
          </Card>
        </div>
        <div>
          <Card sx={cardStyle} onClick={() => handleCardClick("Lizard 2")}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Pandukabhaya 2
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Hostel Details</Button>
            </CardActions>
          </Card>
        </div>

        <div>
          <Card sx={cardStyle} onClick={() => handleCardClick("Lizard 2")}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Vijitha kuruwita
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Hostel Details</Button>
            </CardActions>
          </Card>
        </div>

        <div>
          <Card sx={cardStyle} onClick={() => handleCardClick("Lizard 2")}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                ChithraDevi
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View Hostel Details</Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}
