import reducer from './slice';

// Employees manipulation
export {selectEmployeeID, employeeSortComparer} from './adapter';

// Store actions
export * as employeeActions from './actions';

// Store selectors
export * as employeeSelectors from './selectors';

// Store reducer
export default reducer;
