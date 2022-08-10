context('Index page - OpenWeathermap Component - Dispatch loadOpenWeathermap() - Success', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/');
	});

	it('cy.window() - verify topmost window object', () => {
		cy.window().should('have.property', 'top');
	});

	it('cy.document() - verify document object character set', () => {
		cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
	});

	it('cy.title() - verify document.title property', () => {
		cy.title().should('include', 'Alex Smith\'s App');
	});

	it('cy.get() - should have __NEXT_DATA__ script', () => {
		cy.get('script#__NEXT_DATA__').should('have.length', 1);
	})

	it('cy.get() - verify OpenWeathermap component', () => {
		cy.get('body > div').children().then(($div) => {
			cy.get($div[4]).children().first()
				.should(($div) => {
					const className = $div[0].className;
					expect(className).to.match(/styles__OpenWeathermapContainer/);
				})
		})
	});

	it('cy.contains() - verify OpenWeathermap component Reload button', () => {
		cy.get('body > div').children().then(($div) => {
			cy.get($div[4]).children().first().find('button')
			cy.contains('Reload').should('have.class', 'btn btn-primary btn-md')
		})
	});

	// Server Response tested here
	it('cy.click() - cy.wait() - click OpenWeathermap component Reload button and verify successful re-render', () => {
		cy.get('body > div').children().then(($div) => {
			cy.get($div[4]).children().first().find('button').click();
			cy.wait(3250);
			cy.get($div[4]).children().first().find('span').should('have.attr', 'data-testid');
		})
	});
});
