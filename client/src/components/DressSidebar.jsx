import React from 'react';

import { dressFilterStore } from '../store/dressFilterStore';

import './componentsStyle/DressSidebar.css'

function DressSidebar() {
	const search = dressFilterStore((state) => state.search);
	const setSearch = dressFilterStore((state) => state.setSearch);
	const setColor = dressFilterStore((state) => state.setColor);
	const setSize = dressFilterStore((state) => state.setSize);
	const setCategory = dressFilterStore((state) => state.setCategory);
	const setPrice = dressFilterStore((state) => state.setPrice);

	const handleResetFilters = () => {
        setColor('');
        setSize('');
        setCategory('');
        setPrice('');
    };

  return (
	<aside className="dress-sidebar">
		<form>
			<input 
					type="text" 
					className='dress-search'
					placeholder='მოძებნე სასურველი კაბა'
					value={search} // მნიშვნელობა მოდის Store-დან
					onChange={(e) => setSearch(e.target.value)} // აახლებს Store-ს
			/>
		</form>
			<div className='filters-container'>
				<button onClick={handleResetFilters} className="reset-btn">
                    ყველა კაბა
                </button>
				{/* color */}
				<div className="filter-section">
					<h4>ფერი</h4>
					<button onClick={() => setColor('red')}>წითელი</button>
					<button onClick={() => setColor('black')}>შავი</button>
					<button onClick={() => setColor('white')}>თეთრი</button>
					<button onClick={() => setColor('green')}>მწვანე</button>
					<button onClick={() => setColor('gray')}>ნაცრისფერი</button>
					<button onClick={() => setColor('brown')}>ყავისფერი</button>
					<button onClick={() => setColor('blue')}>ლურჯი</button>
					<button onClick={() => setColor('pink')}>ვარდისფერი</button>
					<button onClick={() => setColor('yellow')}>ყვითელი</button>
					<button onClick={() => setColor('gold')}>ოქროსფერი</button>
				</div>

				{/* size */}
				<div className="filter-section">
					<h4>ზომა</h4>
					<button onClick={() => setSize('M')}>M</button>
					<button onClick={() => setSize('S')}>S</button>
					<button onClick={() => setSize('L')}>L</button>
					<button onClick={() => setSize('XL')}>XL</button>
					<button onClick={() => setSize('2XL')}>2XL</button>
				</div>

				{/* category */}
				<div className="filter-section">
					<h4>კატეგორია</h4>
					<button onClick={() => setCategory('wedding')}>საქორწინო</button>
					<button onClick={() => setCategory('festive')}>სადღესასწაულო</button>
				</div>
				
				{/* price */}
				<div className="filter-section">
					<h4>ფასი</h4>
					<button onClick={() => setPrice('20-50')}>20-50 GEL</button>
					<button onClick={() => setPrice('50-100')}>50-100 GEL</button>
					<button onClick={() => setPrice('100-150')}>100-150 GEL</button>
					<button onClick={() => setPrice('150-200')}>150-200 GEL</button>
					<button onClick={() => setPrice('200-300')}>200-300 GEL</button>
					<button onClick={() => setPrice('300-400')}>300-400 GEL</button>
				</div>
			</div>


	</aside>      
  )
}

export default DressSidebar