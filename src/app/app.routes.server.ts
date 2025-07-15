import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Client,
  },
  {
    path: 'resume',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
