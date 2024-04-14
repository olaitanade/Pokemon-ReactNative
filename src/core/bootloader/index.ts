import vault from 'core/vault';
import {Platform, StatusBar} from 'react-native';

////////////////////////////////////////////////////////////////////////////////////////
// Public Methods
////////////////////////////////////////////////////////////////////////////////////////
async function boot(dispatch: any) {
  //api.boot();
  setAndroidStatusBarState();

  const firstTime = (await vault.getAsync(vault.keys.firsttime)) ?? true;

  if (firstTime) {
    //await vault.setAsync(vault.keys.firsttime, false);
    dispatch({type: 'SET_INITIALROUTE', payload: 'Walkthrough'});
  }

  return;
}

async function shutdown() {}

////////////////////////////////////////////////////////////////////////////////////////
// Helper Methods
////////////////////////////////////////////////////////////////////////////////////////

function setAndroidStatusBarState() {
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }
}

const bootloader = {
  boot,
  shutdown,
};

export default bootloader;
