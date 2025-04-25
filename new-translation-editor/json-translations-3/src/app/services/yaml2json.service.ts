import { Injectable } from '@angular/core';
import * as yaml from 'js-yaml';
@Injectable({
  providedIn: 'root',
})
export class Yaml2jsonService {
  constructor() {
    let json = {
      services: {
        app: {
          container_name: 'letschat',
          image: 'sdelements/lets-chat',
          restart: 'always',
          environment: { LCB_DATABASE_URI: 'mongodb://mongo/letschat' },
          ports: ['80:8080'],
          depends_on: ['db'],
        },
        db: { container_name: 'mongo', image: 'mongo', restart: 'always', volumes: ['/opt/mongo:/data/db'] },
      },
    };

    let ymlString = `services:
    app:
      container_name: letschat
      image: sdelements/lets-chat
      restart: always
      environment:
        LCB_DATABASE_URI: mongodb://mongo/letschat
      ports:
        - '80:8080'
      depends_on:
        - db
    db:
      container_name: mongo
      image: mongo
      restart: always
      volumes:
        - /opt/mongo:/data/db`;
    console.log(this.jsonToYaml(json));
  }



  public yamlToJson(yamlStr:string): any {
    return yaml.load(yamlStr);
  }
  public jsonToYaml(jsonObject:any): any {
    //Indent is 2 spaces
    return yaml.dump(jsonObject);
  }
}
