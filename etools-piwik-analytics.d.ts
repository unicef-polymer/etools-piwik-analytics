/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   etools-piwik-analytics.js
 */

// tslint:disable:variable-name Describing an API that's defined elsewhere.

import {LitElement} from 'lit';

declare class EtoolsPiwikAnalytics extends LitElement {
  page: string | null | undefined;
  queryEntered: boolean | null | undefined;
  toast: string | null | undefined;
  initialLoad: number | null | undefined;
  user: object | null | undefined;
  connectedCallback(): void;
  initPiwik(): void;
  toastFired(): void;

  /**
   * tracks exports and filtering
   */
  trackEvent(e: any): void;

  /**
   * checks if typing is in relevant input field, tracks search bar filtering
   */
  typing(event: any): void;

  /**
   * tracks internal pageviews that aren't picked up with trackPageView
   */
  pageView(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'etools-piwik-analytics': EtoolsPiwikAnalytics;
  }
}
