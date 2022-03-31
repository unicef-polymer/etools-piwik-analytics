import { PolymerElement } from '@polymer/polymer';
import { LitElement } from 'lit-element';

declare type Constructor<T> = new (...args: any[]) => T;
/**
 * @polymer
 * @mixinFunction
 */
declare function MatomoMixin<
  T extends Constructor<LitElement | PolymerElement>
>(
  baseClass: T
): {
  new (...args: any[]): {
    trackAnalytics(event: any): void;
    trackEvent(trackingObject): void;
  };
} & T;
export default MatomoMixin;
