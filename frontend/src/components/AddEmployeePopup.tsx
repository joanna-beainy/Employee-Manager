import { useEmployeeStore } from '../Store/Store';

const POSITIONS = [
  'Software Engineer',
  'Marketing Manager',
  'HR Specialist',
  'Sales Executive',
  'Product Manager',
  'Designer',
];

const DEPARTMENTS = ['Engineering', 'Marketing', 'HR', 'Sales', 'Finance', 'Design'];

function AddEmployeePopup() {
  const {
    name, position, department, salary,
    setName, setPosition, setDepartment, setSalary,
    showModal, EmployeeBeingEdited,
    SaveEmployee, closeModal,
  } = useEmployeeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !position || !department || !salary) return;
    await SaveEmployee(name, position, department, Number(salary));
    closeModal();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"/>

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <i className={`fa-solid ${EmployeeBeingEdited ? 'fa-user-pen' : 'fa-user-plus'} text-blue-500`} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {EmployeeBeingEdited ? 'Edit Employee' : 'Add New Employee'}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
              <i className="fa-solid fa-user text-slate-400 text-xs" />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Sarah"
              className="w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl bg-gray-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
              <i className="fa-solid fa-briefcase text-slate-400 text-xs" />
              Position
            </label>
            <div className="relative">
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
                className="w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl bg-gray-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">Select a position…</option>
                {POSITIONS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <i className="fa-solid fa-chevron-down text-xs" />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
              <i className="fa-solid fa-building text-slate-400 text-xs" />
              Department
            </label>
            <div className="relative">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl bg-gray-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">Select a department…</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <i className="fa-solid fa-chevron-down text-xs" />
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-2">
              <i className="fa-solid fa-dollar-sign text-slate-400 text-xs" />
              Salary
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">$</span>
              <input
                type="number"
                value={salary || ''}
                onChange={(e) => setSalary(e.target.value)}
                required
                min={0}
                placeholder="5,000"
                className="w-full border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl bg-gray-50 pl-8 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-2xl transition-colors shadow-sm"
            >
              <i className={`fa-solid ${EmployeeBeingEdited ? 'fa-floppy-disk' : 'fa-user-plus'} text-xs`} />
              {EmployeeBeingEdited ? 'Save Changes' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployeePopup;