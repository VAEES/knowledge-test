import * as Sentry from "@sentry/node";

export class EventTracing {
  static start(dns: string) {
    Sentry.init({
      dsn: dns,
      tracesSampleRate: 1.0,
    });
  }

  static captureException(err: any) {
    Sentry.captureException(err);
  }

  static captureMessage(message: string) {
    Sentry.captureMessage(message);
  }

  static captureEvent(event: any) {
    Sentry.captureEvent(event);
  }
}
