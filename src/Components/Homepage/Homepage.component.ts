import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-homepage',
  template: `
    <div class="homepage-container">
      <div class="banner">
        <h1>Entity's Book</h1>
      </div>
      <div class="filters-banner">
        <div class="filter">
          <label for="filter-asesinos">Asesinos</label>
          <select
            id="filter-asesinos"
            (change)="applyFilter('asesinos', $event)"
          >
            <option value="usagerate-asc">Uso (Ascendente)</option>
            <option value="usagerate-desc">Uso (Descendente)</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="killrate-asc">Killrate (Ascendente)</option>
            <option value="killrate-desc">Killrate (Descendente)</option>
            <option value="speedmove-asc">Velocidad (Ascendente)</option>
            <option value="speedmove-desc">Velocidad (Descendente)</option>
            <option value="terrorradio-asc">
              Radio de Terror (Ascendente)
            </option>
            <option value="terrorradio-desc">
              Radio de Terror (Descendente)
            </option>
          </select>
        </div>
        <div class="filter">
          <label for="filter-supervivientes">Supervivientes</label>
          <select
            id="filter-supervivientes"
            (change)="applyFilter('supervivientes', $event)"
          >
            <option value="usagerate-asc">Uso (Ascendente)</option>
            <option value="usagerate-desc">Uso (Descendente)</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
          </select>
        </div>
        <div class="filter">
          <label for="filter-habilidades-asesinos"
            >Habilidades de Asesinos</label
          >
          <select
            id="filter-habilidades-asesinos"
            (change)="applyFilter('habilidadesAsesinos', $event)"
          >
            <option value="usagerate-asc">Uso (Ascendente)</option>
            <option value="usagerate-desc">Uso (Descendente)</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
          </select>
        </div>
        <div class="filter">
          <label for="filter-habilidades-supervivientes"
            >Habilidades de Supervivientes</label
          >
          <select
            id="filter-habilidades-supervivientes"
            (change)="applyFilter('habilidadesSupervivientes', $event)"
          >
            <option value="usagerate-asc">Uso (Ascendente)</option>
            <option value="usagerate-desc">Uso (Descendente)</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
          </select>
        </div>
        <input type="text" placeholder="Buscar..." class="search-bar" />
        <button class="icon-button">☰</button>
        <button class="refresh-button" (click)="refreshPage()">🔄</button>
      </div>
    </div>
  `,
  styleUrls: ['./Homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('homepage-active');
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('homepage-active');
    }
  }

  applyFilter(type: string, event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    console.log(`Aplicando filtro ${type} con valor: ${value}`);
    // Lógica para aplicar el filtro
  }

  refreshPage() {
    console.log('Refrescando la página');
    window.location.reload();
  }
}
