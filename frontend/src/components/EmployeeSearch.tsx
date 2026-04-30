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

function EmployeeSearch() {
  const {
    filterName, filterPosition, filterDepartment,
    setFilterName, setFilterPosition, setFilterDepartment,
    clearFilters,
  } = useEmployeeStore();

  const hasFilters = filterName || filterPosition || filterDepartment;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3">
        
        <div className="relative flex-1">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name…"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        <div className="relative">
          <i className="fa-solid fa-briefcase absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg pl-9 pr-8 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Positions</option>
            {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />
        </div>

        <div className="relative">
          <i className="fa-solid fa-building absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg pl-9 pr-8 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400 transition-colors whitespace-nowrap"
          >
            <i className="fa-solid fa-xmark" />
            Clear
          </button>
        )}

      </div>

      {hasFilters && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {filterName && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full ring-1 ring-blue-200">
              <i className="fa-solid fa-user text-[9px]" />
              "{filterName}"
              <button onClick={() => setFilterName('')} className="ml-0.5 hover:text-blue-900 transition-colors">
                <i className="fa-solid fa-xmark text-[9px]" />
              </button>
            </span>
          )}
          {filterPosition && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full ring-1 ring-violet-200">
              <i className="fa-solid fa-briefcase text-[9px]" />
              {filterPosition}
              <button onClick={() => setFilterPosition('')} className="ml-0.5 hover:text-violet-900 transition-colors">
                <i className="fa-solid fa-xmark text-[9px]" />
              </button>
            </span>
          )}
          {filterDepartment && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full ring-1 ring-emerald-200">
              <i className="fa-solid fa-building text-[9px]" />
              {filterDepartment}
              <button onClick={() => setFilterDepartment('')} className="ml-0.5 hover:text-emerald-900 transition-colors">
                <i className="fa-solid fa-xmark text-[9px]" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default EmployeeSearch;