$('#edit').on('change', function() {
	$('#double, #surrender').prop('disabled', !this.checked);
	$('label[for=double], label[for=surrender]').toggleClass('disabled');
});

$('button').on('click', function() {

    //
    // Update configuration
    //

    let conf = {
        decks: $('#decks').val(),
        soft17: $('#soft17').val(),
        peek: $('#peek').val() == 'true' ? true : false,
        double: $('#double').val() == 'true' ? true : false,
        surrender: $('#surrender').val(),
        edit: $('#edit').is(':checked')
    };

    let table = $('table').html('');

    //
    // Get strategy
    //

    let strategy = strategies[conf.decks][conf.soft17];

    for (let [group, rows] of Object.entries(strategy)) {

        //
        // Create heading
        //

        table
            .append('<thead>').children('thead:last-child')// .addClass('thead-dark') // thead-light thead-dark
            .append('<tr>').children('tr')
            .append([group, ...headings].map(function (item, index) {
                return $('<th>').addClass('head').text(item);
            }));

        //
        // Create body
        //

        table
            .append('<tbody>').children('tbody:last-child')
            .append(rows.map(function (row, index) {

                //
                // Edit strategy
                //

                let ten = conf.peek ? 8 : 10;
                let ace = conf.peek ? 9 : 11;
                
                let edit = row.slice(0,8).concat(row[ten], row[ace]);

                //
                // Create row
                //
            
            	let caption = captions[group][index];

                return $('<tr>')
                	.append('<td>').find('td:last-child').addClass(index % 2 ? 'odd' : 'even').text(caption)
                    .closest('tr')
                    .append(edit.map(function (action, index) {

                        //
                        // Edit action
                        //
                        
                        let sup = null;

                        if(conf.edit) {
                        	switch (action) {
				                case 'YDH': // Split if DAS, or Double
									action = conf.double ? 'Y' : 'DH';
									break;
				                case 'YH': // Split if DAS, or Hit
									action = conf.double ? 'Y' : 'H';
									break;
				                case 'YS': // Split if DAS, or Stand
									action = conf.double ? 'Y' : 'S';
									break;
				                case 'RH': // Surrender or Hit
									if(conf.surrender == 'any' || (conf.surrender == '2to10' && caption != 'A'))
										action = 'RH';
									else
										action = 'H';
									break;
				                case 'RY': // Surrender or Split
									if(conf.surrender == 'any' || (conf.surrender == '2to10' && caption != 'A'))
										action = 'RY';
									else
										action = 'Y';
									break;
				                case 'RS': // Surrender or Stand
									if(conf.surrender == 'any' || (conf.surrender == '2to10' && caption != 'A'))
										action = 'RS';
									else
										action = 'S';
									break;
				            }
                        } else {
                            switch (action) {
                                case 'YDH': // Split if DAS, or Double
                                case 'YH': // Split if DAS, or Hit
                                case 'YS': // Split if DAS, or Stand
                                    
                                    sup = $('<span>').text('*');

                                    // Better solution, require more space
                                    // sup = $('<sup>').text(' DAS');
                            }
                        }

                        //
                        // Create cell
                        //
                        
                        return item = $('<td>')
                            .addClass(action.charAt(0).toLowerCase())
                            .addClass(action.toLowerCase())
                            .text(action)
                            .append(sup);
                            
                    }));
            }));
    };
});
