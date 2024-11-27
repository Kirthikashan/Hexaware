exports.getCourses = async (req, res) => {
    try {
      const courses = []; // Fetch courses logic here
      res.status(200).json({ courses });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching courses', error });
    }
  };
  