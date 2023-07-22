import { ContentDispatcherService, MarioEvent } from '@urbandevs/mario-core/dist/src';
import { ContentEvents } from '../../../../bg/ContentEvents';
import { IframeEvents } from '../../IframeEvents';
import { UrlsSafeCheckEvents } from '@urbandevs/mario-urls-safe-check/dist/UrlsSafeCheckEvents';
import { GoogleAnalyticsContentDispatcher } from '@urbandevs/mario-google-analytics/dist/GoogleAnalyticsContentDispatcher';

const dispatcher = new ContentDispatcherService();
const googleAnalytics = new GoogleAnalyticsContentDispatcher(dispatcher);

let muteCheckboxEl, btnContinueEl, btnLeaveEl;

document.addEventListener('DOMContentLoaded', () => {
  onReady();
});

function onReady() {
  muteCheckboxEl = document.getElementById('muteCheckbox') as HTMLInputElement;
  btnContinueEl = document.getElementById('btnContinue');
  btnLeaveEl = document.getElementById('btnLeave');

  btnContinueEl.addEventListener('click', () => {
    onBtnContinueClick();
  });

  btnLeaveEl.addEventListener('click', () => {
    onBtnLeaveClick();
  });
}

function onBtnContinueClick() {
  try {
    dispatcher.emit(new MarioEvent(UrlsSafeCheckEvents.MUTE_NOTIFICATION, {
      persist: muteCheckboxEl.checked
    }));
  
    googleAnalytics.trackEvent({
      category: 'unsafe_popup_continue_button',
      action: 'clicked'
    });
  } catch(err) {
    console.log(`${UrlsSafeCheckEvents.MUTE_NOTIFICATION} event sending error`);
  }

  sendIframeEvent(IframeEvents.CLOSE);
}

function onBtnLeaveClick() {
  try {
    dispatcher.emit(new MarioEvent(UrlsSafeCheckEvents.MUTE_NOTIFICATION, {
      persist: muteCheckboxEl.checked
    }));

    googleAnalytics.trackEvent({
      category: 'unsafe_popup_get_me_out_button',
      action: 'clicked'
    });

    dispatcher.emit(new MarioEvent(ContentEvents.REDIRECT_TO_SAFE_PAGE));
  } catch(e) {
    console.log(`safesearch notification event sending error`);
  }
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
