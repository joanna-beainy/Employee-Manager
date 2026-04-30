import Employee from "../Models/Employee.js";

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, position, department, salary } = req.body;

    if (!name || !position || !department || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEmployee = new Employee({
      name,
      position,
      department,
      salary,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error: error.message });
  }
};


export const updateEmployee = async (req, res) => {
  try {
    const updates = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
};


export const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully", deleted: deletedEmployee});
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error: error.message });
  }
};
