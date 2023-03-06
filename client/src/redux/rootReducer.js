import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import chatReducer from './slices/chat';
import userReducer from './slices/user';
import kanbanReducer from './slices/kanban';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};
const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
  kanban: kanbanReducer
});

export { rootPersistConfig, rootReducer };
