import {LitElement} from 'lit';

declare type Constructor<T> = new (...args: any[]) => T;
/**
 * @polymer
 * @mixinFunction
 */
declare function MatomoMixin<T extends Constructor<LitElement>>(
  baseClass: T
): {
  new (...args: any[]): {
    trackAnalytics(event: any): void;
    trackEvent(trackingObject): void;
  };
} & T;
export default MatomoMixin;
