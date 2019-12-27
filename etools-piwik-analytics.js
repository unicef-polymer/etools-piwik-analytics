import {PolymerElement} from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/utils/render-status.js";

// _paq array initialization and tracking script
if (!('_paq' in window)) {
  window._paq = [];
}


/**
 * @polymer
 * @customElement
 */
class EtoolsPiwikAnalytics extends PolymerElement {
  static get is() {
    return 'etools-piwik-analytics';
  }

  static get properties() {
    return {
      page: {
        type: String,
        observer: 'pageView'
      },
      queryEntered: {
        type: Boolean,
        value: false
      },
      toast: {
        type: String,
        observer: 'toastFired'
      },
      initialLoad: {
        type: Number,
        value: 0
      },
      user: {
        type: Object,
        observer: 'initPiwik'
      },
      siteUrl: {
        type: String
      },
      siteId: {
        type: String,
        observer: 'initializeTracker'
      }
    };
  }

  initializeTracker() {
    _paq.push(['trackPageView']);
    _paq.push(['trackAllContentImpressions']);
    _paq.push(['enableLinkTracking']);
    _paq.push(['enableHeartBeatTimer']);
    var u = this.siteUrl;
    _paq.push(['setTrackerUrl', u + 'piwik.php']);
    _paq.push(['setSiteId', this.siteId]);
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript'
    g.defer = true
    g.async = true
    g.src = u + 'piwik.js';
    s.parentNode.insertBefore(g, s);
  }

  initPiwik() {
    _paq.push(['setUserId', this.user.email]);
  }

  toastFired() {
    if (!!this.toast) { // eslint-disable-line
      _paq.push([
        'trackEvent',
        'toast notification',
        this.page,
        this.toast
      ]);
    }
  }

  // tracks internal pageviews that aren't picked up with trackPageView
  pageView() {
    if (this.page) {
      // checks to make sure pageView is not double counting initial pageload
      if (this.initialLoad > 1) {
        _paq.push([
          'trackEvent',
          'in-app navigation',
          this.page,
          'tap'
        ]);
      }
      this.initialLoad += 1;
    }
  }
}

window.customElements.define(EtoolsPiwikAnalytics.is, EtoolsPiwikAnalytics);






