window._paq = window._paq || [];

if (!('_paq' in window)) {
  window._paq = [];
}

function MatomoMixin(baseClass) {
  return class MatomoClass extends baseClass {
    trackAnalytics(event) {
      const trackingObj = {};
      trackingObj.event = event.currentTarget.getAttribute('tracker');
      trackingObj.page = window.location.href;

      this.trackEvent(trackingObj);
    }

    trackEvent(trackingObject) {
      window._paq.push([
        'trackEvent',
        trackingObject.event,
        trackingObject.page
      ]);
    }
  };
}

export default MatomoMixin;
