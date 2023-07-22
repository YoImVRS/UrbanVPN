import { PriceCheckIframeEvents } from '../../PriceCheckIframeEvents';
import { ContentDispatcherService, MarioEvent } from '@urbandevs/mario-core/dist/src';
import { ECommerceModuleEvents } from '../../../../bg/modules/e-commerce-module/ECommerceModule.events';

let muteCheckboxEl, btnOkEl;

const dispatcher = new ContentDispatcherService();

document.addEventListener('DOMContentLoaded', onReady);

function onReady() {
  muteCheckboxEl = document.getElementById('muteCheckbox') as HTMLInputElement;
  btnOkEl = document.getElementById('btnOk');

  btnOkEl.addEventListener('click', () => {
    onBtnContinueClick();
  });
}

function onBtnContinueClick() {
  if (muteCheckboxEl.checked) {
    dispatcher.emit(new MarioEvent(ECommerceModuleEvents.MUTE_NOTIFICATION));
  }
  sendIframeEvent(PriceCheckIframeEvents.OK, { mute: muteCheckboxEl.checked });
}

function sendIframeEvent(event, params = {}) {
  try {
    parent.postMessage({
      message: event,
      ...params
    }, '*');
  } catch(err) {
    // parent frame send error
  }
}
