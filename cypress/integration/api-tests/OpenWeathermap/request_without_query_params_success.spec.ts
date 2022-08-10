describe('OpenWeather API Route Endpoint Test Success', () => {
	it('cy.request() - without query parameters', () => {
		cy.request({
			url: 'http://localhost:3000/api/openweathermap',
			qs: {
				lat: 'undefined',
				lon: 'undefined',
			},
		})
			.then((res) => {
				expect(res.status).to.eq(200);
				expect(res.body.coord).to.exist;
				expect(res.body.weather).to.exist;
				expect(res.body.name).to.equal('New York');
			})
	})
});
