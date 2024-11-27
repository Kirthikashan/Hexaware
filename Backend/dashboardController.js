exports.getDashboardData = async (req, res) => {
    try {
      const data = {}; // Replace with actual logic to get dashboard data
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dashboard data', error });
    }
  };
  