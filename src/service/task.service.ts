import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class TaskService {
  @Cron(CronExpression.EVERY_MINUTE)
  async checkHealth() {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    this.get('gateway', '3000');
    this.get('auth', '3001');
    this.get('account', '3002');
    this.get('notif', '3003');
    this.get('dashboard', '3004');
    this.get('deposit', '3005');
    this.get('upload', '3006');
  }

  private async get(host: string, port: string) {
    return axios({
      method: 'GET',
      url: `http://${host}:${port}`, // you can't debug localhost here
      timeout: 1000, // ms
    }).catch((err) => {
      if (err?.response?.status === 404) {
        return;
      }
      Logger.log(`checkHealth err: ${err}`);
    });
  }
}
