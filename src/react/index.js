import { 
  useState, 
  useCallback, 
  useEffect, 
} from 'react';
import storage from '../Storage';

function createStorage(storage) {
  return function creator( key ) {
    const store = storage;
    const getValue = () => store.get(key);
    const [ data, setData ] = useState(getValue);

    if (!key) {
      return (list = []) => {
        store.clear(list)
        setData(undefined);
      }
    };

    useEffect(() => {
      setData(getValue())
    }, [key]);

    const update = useCallback((val) => {
      if (typeof val === 'undefined') {
        store.remove(key);
        setData(undefined);
      } else {
        const current = Object.assign(data, (
          typeof val === 'function' 
          ?  val(getValue()) 
          : (val || getValue())
        ));
        store.set(key, current);
        setData(current)
      }
    }, [key]);

    return [ data, update ];
  }
};

export const useLocal = createStorage(storage.local);
export const useSession = createStorage(storage.session);
