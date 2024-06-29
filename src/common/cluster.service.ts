import { Injectable } from '@nestjs/common';
import cluster from 'cluster';
import { cpus } from 'os';
import * as process from 'node:process';

const numCPUs = cpus().length;

type CallbackFunction = () => void;

@Injectable()
export class ClusterService {
  static clusterize(callback: CallbackFunction): void {
    if (cluster.isPrimary) {
      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
      });
    } else {
      callback();
    }
  }
}
