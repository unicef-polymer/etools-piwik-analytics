import { PolymerElement } from '@polymer/polymer';
import '@polymer/polymer/lib/utils/render-status.js';

const SITE_ID = (function () {
  switch (window.location.host) {
    case 'etools.unicef.org':
      return '1';
    case 'etools-dev.unicef.org':
      return '2';
    case 'etools-staging.unicef.org':
      return '4';
    case 'etools-demo.unicef.org':
      return '5';
    case 'dev.partnerreportingportal.org':
      return '14';
    case 'www.partnerreportingportal.org':
      return '16';
    default:
      return '6';
  }
})();

// _paq array initialization and tracking script
if (!('_paq' in window)) {
  window._paq = [];
}
// disables tracking for local development
if (SITE_ID === '6') {
  _paq.push(['requireConsent']);
}
_paq.push(['trackPageView']);
_paq.push(['trackAllContentImpressions']);
_paq.push(['enableLinkTracking']);
_paq.push(['enableHeartBeatTimer']);
var u = 'https://unisitetracker.unicef.io/';
_paq.push(['setTrackerUrl', u + 'piwik.php']);
_paq.push(['setSiteId', SITE_ID]);
var d = document,
  g = d.createElement('script'),
  s = d.getElementsByTagName('script')[0];
g.type = 'text/javascript';
g.defer = true;
g.async = true;
g.src = u + 'piwik.js';
s.parentNode.insertBefore(g, s);

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
        observer: 'pageView',
      },
      queryEntered: {
        type: Boolean,
        value: false,
      },
      toast: {
        type: String,
        observer: 'toastFired',
      },
      initialLoad: {
        type: Number,
        value: 0,
      },
      user: {
        type: Object,
        observer: 'initPiwik',
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // sets global event listeners, sets global error listener
    document.addEventListener('tap', this.trackEvent.bind(this));
    document.addEventListener('keyup', this.typing.bind(this));
  }

  initPiwik() {
    _paq.push(['setUserId', this.user.email]);
  }

  toastFired() {
    if (!!this.toast) {
      // eslint-disable-line
      _paq.push(['trackEvent', 'toast notification', this.page, this.toast]);
    }
  }

  // tracks exports and filtering
  trackEvent(e) {
    const currentElem =
      e.detail.sourceEvent.currentTarget || e.detail.sourceEvent.target;
    let buttonText = currentElem.innerText;

    if (
      currentElem &&
      !['EXPORT', 'GET CHART', 'ADD FILTER', 'FILTERS'].includes(buttonText)
    ) {
      const parentDiv = currentElem.closest('div');
      const isTranslatedFiltersButton = parentDiv
        ? parentDiv.id == 'filters-selector'
        : false;
      if (isTranslatedFiltersButton) {
        buttonText = 'ADD Filter';
      }
    }

    if (!!buttonText) {
      // eslint-disable-line
      switch (buttonText) {
        // tracks document exports
        case 'EXPORT':
          _paq.push([
            'trackEvent',
            'export',
            this.page,
            this.user.groups.map(function (g) {
              return g.name;
            }),
          ]);
          break;
        // tracks filtered charts on dashboard/trips
        case 'GET CHART':
          _paq.push([
            'trackEvent',
            'chart filtered',
            this.page,
            this.user.groups.map(function (g) {
              return g.name;
            }),
          ]);
          break;
        // tracks drop-down filtering in PMP
        case 'FILTERS':
        case 'ADD FILTER':
          _paq.push([
            'trackEvent',
            'chart filtered',
            this.page,
            this.user.groups.map(function (g) {
              return g.name;
            }),
          ]);
          break;

        default:
          _paq.push([
            'trackEvent',
            'in-app navigation',
            document.location.pathname,
            'tap',
          ]);
      }
    }
  }

  // checks if typing is in relevant input field, tracks search bar filtering
  typing(event) {
    // events have different properties in IE vs Chrome; checks both
    const currentElement = event.composedPath()[0];
    let val = currentElement ? currentElement.value : '';
    let isTypeSearch = currentElement
      ? currentElement.type === 'search'
      : false;
    if (val && isTypeSearch && this.queryEntered === false) {
      _paq.push([
        'trackEvent',
        'search bar used',
        this.page,
        this.user.groups.map(function (g) {
          return g.name;
        }),
      ]);
      this.set('queryEntered', true);
    }
  }

  // tracks internal pageviews that aren't picked up with trackPageView
  pageView() {
    if (this.page) {
      // checks to make sure pageView is not double counting initial pageload
      if (this.initialLoad > 1) {
        _paq.push(['trackEvent', 'in-app navigation', this.page, 'tap']);
      }
      this.initialLoad += 1;
    }
  }
}

window.customElements.define(EtoolsPiwikAnalytics.is, EtoolsPiwikAnalytics);
