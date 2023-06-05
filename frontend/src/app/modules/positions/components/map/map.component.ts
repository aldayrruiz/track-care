import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Position } from '@core/models/positions/position.dto';
import { PositionType } from '@core/models/positions/type.dto';
import { Smartwatch } from '@core/models/smartwaches/smartwatch.model';
import { User } from '@core/models/users/user.model';
import { PositionService } from '@core/services/position.service';
import { icon, latLng, Layer, Map, Marker, marker, tileLayer } from 'leaflet';

const leafletIcons = {
  [PositionType.EMERGENCY]: 'assets/leaflet/body-red-warning.png',
  [PositionType.MONITORING]: 'assets/leaflet/body.png',
  [PositionType.TAKEOFF]: 'assets/leaflet/body-yellow-warning.png',
};

interface Pointer {
  user?: User;
  smartwatch?: Smartwatch;
  position: Position;
  marker: Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  users!: User[];
  smartwatches!: Smartwatch[];

  // MAP Settings
  map!: Map;
  LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Open Street Map',
  });

  options = {
    layers: [this.LAYER_OSM],
    zoom: 6,
    center: latLng(40.463667, -3.74922),
  };

  // Positions
  pointers: Pointer[] = [];
  positions: Position[] = [];
  markers: Layer[] = [];

  constructor(private route: ActivatedRoute, private positionService: PositionService) {
    this.resolve();
    this.getPositions();
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  setPointers(positions: Position[]) {
    this.markers = []; // Clear markers
    this.pointers = []; // Clear pointers

    this.positions = positions;
    this.positions.forEach((position) => {
      const smartwatch = this.smartwatches.find((smartwatch) => smartwatch.androidId === position.androidId);
      const user = this.users.find((user) => user.smartwatch === smartwatch?.id);
      const marker = this.addMarker(position);
      this.pointers.push({ user, smartwatch, position, marker });
    });
  }

  addMarker(position: Position) {
    const newMarker = this.createMarker(position);
    this.markers.push(newMarker);
    return newMarker;
  }

  removeMarker() {
    this.markers.pop();
  }

  focusMapOnPosition(position: Position) {
    this.map.setView([position.latitude, position.longitude], 15);
  }

  private createMarker(position: Position) {
    const latitudeLongitude = latLng(position.latitude, position.longitude);
    const iconSize: [number, number] = [50, 50];
    const iconAnchor: [number, number] = [20, 30];
    const iconUrl = leafletIcons[position.type];
    const newMarker = marker(latitudeLongitude, { icon: icon({ iconSize, iconAnchor, iconUrl }) });
    return newMarker;
  }

  private getPositions() {
    const TWENTY_SECONDS = 20000;
    this.positionService.lastPositions().subscribe({
      next: (positions) => this.setPointers(positions),
      complete: () => setTimeout(() => this.getPositions(), TWENTY_SECONDS),
    });
  }

  private resolve() {
    this.route.data.subscribe((data) => {
      this.users = data['users'];
      this.smartwatches = data['smartwatches'];
    });
  }
}
