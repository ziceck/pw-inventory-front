/**
 * Define los atributos que debe tener un objeto de tipo Module.
 * Se usa en menu.service.ts
 */
import { Submodule } from './submodule.model';

export interface Module {

  module: string;
  roles: string[];
  url: string;
  icon: string;
  name: string;
  submodules: Submodule[];

}
