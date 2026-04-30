import { useEmployeeStore } from '../Store/Store';
import type { Employee as EmployeeType } from '../shared/type';

const DEPT_STYLES: Record<string, { pill: string; icon: string }> = {
  Engineering: { pill: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',    icon: 'fa-solid fa-code text-blue-400' },
  Marketing:   { pill: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200', icon: 'fa-solid fa-bullhorn text-purple-400' },
  HR:          { pill: 'bg-green-50 text-green-700 ring-1 ring-green-200',  icon: 'fa-solid fa-users-gear text-green-400' },
  Sales:       { pill: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200', icon: 'fa-solid fa-chart-line text-orange-400' },
  Finance:     { pill: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200', icon: 'fa-solid fa-coins text-yellow-500' },
  Design:      { pill: 'bg-pink-50 text-pink-700 ring-1 ring-pink-200',    icon: 'fa-solid fa-pen-nib text-pink-400' },
};

const AVATAR_Style = [
  'bg-blue-200 text-blue-500 ring-1 ring-blue-400', 
  'bg-purple-200 text-purple-500 ring-1 ring-purple-400',
  'bg-red-200 text-red-500 ring-1 ring-red-400 ', 
  'bg-green-200 text-green-500 ring-1 ring-green-400',
  'bg-orange-200 text-orange-500 ring-1 ring-orange-400', 
  'bg-yellow-200 text-yellow-500 ring-1 ring-yellow-400',
  'bg-indigo-200 text-indigo-500 ring-1 ring-indigo-400', 
  'bg-pink-200 text-pink-500 ring-1 ring-pink-400',
];

function Employee({ employee }: { employee: EmployeeType}) {
  const { editEmployee, deleteEmployee } = useEmployeeStore();

  const dept = DEPT_STYLES[employee.department] ?? {
    pill: 'bg-slate-50 text-slate-600 ring-1 ring-slate-200',
    icon: 'fa-solid fa-briefcase text-slate-400',
  };
  
  const avatarLetter = employee.name.charAt(0).toUpperCase();
  const randomStyle = AVATAR_Style[Math.floor(Math.random() * AVATAR_Style.length)];
  

  return (
    <tr className="hover:bg-slate-50/70 transition-colors group">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${randomStyle} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
            {avatarLetter}
          </div>
          <span className="text-sm font-semibold text-slate-800">{employee.name}</span>
        </div>
      </td>
      <td className="px-5 py-4 text-sm text-slate-500">{employee.position}</td>
      <td className="px-5 py-4">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${dept.pill}`}>
          <i className={`${dept.icon} text-[10px]`} />
          {employee.department}
        </span>
      </td>
      <td className="px-5 py-4">
        <span className="text-sm font-bold text-slate-700">
          ${employee.salary.toLocaleString()}
        </span>
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => editEmployee(employee._id)}
            title="Edit"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 transition-colors"
          >
            <i className="fa-solid fa-pen-to-square text-xs" />
          </button>
          <button
            onClick={() => deleteEmployee(employee._id)}
            title="Delete"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-400 transition-colors"
          >
            <i className="fa-solid fa-trash text-xs" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Employee;
