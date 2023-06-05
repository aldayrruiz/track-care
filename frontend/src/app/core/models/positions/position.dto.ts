import { SourcePosition } from './source.dto';
import { PositionType } from './type.dto';

export interface Position {
  id: string;
  type: PositionType;
  androidId: string;
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number;
  battery: number;
  source: SourcePosition;
  deviceTimestamp: string;
  serverTimestamp: string;
}
