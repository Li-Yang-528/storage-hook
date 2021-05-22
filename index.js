import storage from './src/Storage';
import createStorage from './src/hook';

export const useLocal = createStorage(storage.local);
export const useSession = createStorage(storage.session);

export default storage;
