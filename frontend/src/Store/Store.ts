import { create } from 'zustand';
import axios from 'axios';
import type { Employee } from "../shared/type";

const API_URL = 'http://localhost:3000/api/employees';

interface EmployeeStore {
  employees: Employee[];
  showModal: boolean;
  EmployeeBeingEdited: Employee | null;
  name: string;
  position: string;
  department: string;
  salary: number;

  filterName: string;
  filterPosition: string;
  filterDepartment: string;

  setShowModal: (show: boolean) => void;
  setName: (name: string) => void;
  setPosition: (position: string) => void;
  setDepartment: (department: string) => void;
  setSalary: (salary: string | number) => void;

  setFilterName: (name: string) => void;
  setFilterPosition: (position: string) => void;
  setFilterDepartment: (department: string) => void;
  clearFilters: () => void;

  filteredEmployees: () => Employee[];

  fetchEmployees: () => void;
  SaveEmployee: (name: string, position: string, department: string, salary: number) => void;
  editEmployee: (id: string) => void;
  deleteEmployee: (id: string) => void;
  closeModal: () => void;
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: [],
  showModal: false,
  EmployeeBeingEdited: null,
  name: '',
  position: '',
  department: '',
  salary: 0,

  filterName: '',
  filterPosition: '',
  filterDepartment: '',

  setShowModal: (show) => set({ showModal: show }),
  setName: (name) => set({ name }),
  setPosition: (position) => set({ position }),
  setDepartment: (department) => set({ department }),
  setSalary: (salary) => set({ salary: typeof salary === 'string' ? parseInt(salary) : salary }),

  setFilterName: (filterName) => set({ filterName }),
  setFilterPosition: (filterPosition) => set({ filterPosition }),
  setFilterDepartment: (filterDepartment) => set({ filterDepartment }),

  clearFilters: () => set({ 
    filterName: '', 
    filterPosition: '', 
    filterDepartment: '' 
  }),

  filteredEmployees: () => {
    const { employees, filterName, filterPosition, filterDepartment } = get();
    return employees.filter((emp) => {
      const matchesName       = !filterName       || emp.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesPosition   = !filterPosition   || emp.position === filterPosition;
      const matchesDepartment = !filterDepartment || emp.department === filterDepartment;
      return matchesName && matchesPosition && matchesDepartment;
    });
  },

  fetchEmployees: async () => {
    try {
      const res = await axios.get(API_URL);
      set({ employees: res.data });
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  },

  SaveEmployee: async (name, position, department, salary) => {
    try {
      const { EmployeeBeingEdited, fetchEmployees} = get();
      if (EmployeeBeingEdited && EmployeeBeingEdited._id) {
        await axios.put(`${API_URL}/${EmployeeBeingEdited._id}`, { name, position, department, salary });
      } else {
        await axios.post(API_URL, { name, position, department, salary });
      }
      await fetchEmployees();
      set({
        showModal: false,
        EmployeeBeingEdited: null,
        name: '', position: '', department: '', salary: 0,
      });
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  },

  editEmployee: (id) => {
    const { employees } = get();
    const employeeToEdit = employees.find((emp) => emp._id === id);
    if (employeeToEdit) {
      set({
        EmployeeBeingEdited: employeeToEdit,
        showModal: true,
        name: employeeToEdit.name,
        position: employeeToEdit.position,
        department: employeeToEdit.department,
        salary: employeeToEdit.salary,
      });
    }
  },

  deleteEmployee: async (id) => {
    const {fetchEmployees} = get();
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  },

  closeModal: () =>
    set({
      EmployeeBeingEdited: null,
      showModal: false,
      name: '', position: '', department: '', salary: 0,
    }),
}));