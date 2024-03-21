import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedFile: File | null = null;
  constructor() { }
}
