function fetchIndex(callback) {
  let dir_url='http://library.pyramidal-foundational-information.com/books/'
  $.get(dir_url, {
    crossOrigin : true
  }, (data) => {
    let html = $.parseHTML($.trim(data))

    // Convert back to jquery from parsed array (for multiple transforms)
    html = $(html).filter('table')

    // Remove table sort links (don't work outside of original document)
    $('th a', html).replaceWith( function () { return this.textContent })

    // Remove horizontal rule row(s)
    $('hr', html).parents('tr').remove()

    // Create thead and move header cell rows to it.
    let head = $('<thead />').prependTo( html )
    $('th', html).parent('tr').appendTo( head )

    // Remove empty column
    $('td:first-child, th:first-child', html).remove()

    // Resolve the relative `mod_autoindex` links to the source `dir_url`.
    $('td a', html)
      .each( (index, element) => {
        element = $(element)
        let relative = element.attr('href')

        element.attr('href', dir_url + '/' + relative)
      })

    callback( html )
  }, 'html')
}
