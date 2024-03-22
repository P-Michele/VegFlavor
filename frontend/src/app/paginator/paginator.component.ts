import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})

export class PaginatorComponent {

  @Input() totalPages!: number ;
  @Input() currentPage!: number ;
  @Output() pageChange = new EventEmitter<number>();



  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.pageChange.emit(this.currentPage);
    }
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  pageNumbers(): (number | string)[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const pagesToShow = 9; // Number of pages to show without ellipsis

    // If there are less than 'pagesToShow' pages, show all pages
    if (totalPages <= pagesToShow) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let startPage: number;
    let endPage: number;

    // Calculate startPage and endPage based on the current page
    if (currentPage <= Math.ceil(pagesToShow / 2)) {
      // Display pages from 1 to pagesToShow
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + Math.floor(pagesToShow / 2) >= totalPages) {
      // Display last 'pagesToShow' pages
      startPage = totalPages - pagesToShow + 1;
      endPage = totalPages;
    } else {
      // Display pages around the current page
      startPage = currentPage - Math.floor(pagesToShow / 2);
      endPage = currentPage + Math.floor(pagesToShow / 2);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage);

    // Add ellipsis and first/last page if necessary
    const result = [];
    if (startPage > 1) {
      result.push(1);
      if (startPage > 2) {
        result.push('...');
      }
    }
    result.push(...pages);
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        result.push('...');
      }
      result.push(totalPages);
    }

    return result;
  }
}
