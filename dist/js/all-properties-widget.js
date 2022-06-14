function clickWidgetButton($event) {
    // console.log('clickWidgetButton', $event.currentTarget.id);
    const ID = $event.currentTarget.id.toString();
    let title = '';
    let type = ''
    let subType = '';
    if (ID.includes('condo')) {
        title = 'Condos';
        type = 'Condo';
    }
    if (ID.includes('town')) {
        title = 'Townhomes';
        type = 'Townhome';
    }
    if (ID.includes('homes')) {
        title = 'Homes';
        type = 'House';
    }
    if (ID.includes('apartment')) {
        title = 'Apartment Living';
        type = 'Apartment';
    }
    if (ID.includes('Sale')) {
        title += ' For Sale';
        subType = 'sale';
    }
    if (ID.includes('Rent')) {
        title += ' For Rent';
        subType = 'rent';
    }
    if (ID.includes('Living')) {
        subType = 'living';
        if (title === 'Condos') {
            title = 'Condo Living';
        }
        if (title === 'Townhomes') {
            title = 'Townhome Living';
        }
        if (title === 'Homes') {
            title = 'Detached Home Living';
        }
    }
    $('#widgetTitle').html(title);

    let html = '';
    const propertyList = JSON.parse(localStorage.getItem('allProperties'));
    for (let i = 0; i < propertyList.length; i++) {
        let loc = propertyList[i];
        if (!loc.Slug__c || !loc.Property_Type__c || !loc.Subdivision_Nickname__c) {
            continue;
        }
        if (type === 'Apartment' && loc.Property_Type__c.includes('Apartment')) {
            let link = loc.Slug__c.toLowerCase().replace(/ /g, '-').replace(/'/g, '');
            let text = loc.Subdivision_Nickname__c + ' Apartment Living';
            html += '<a href="' + link + '" class="list-group-item list-group-item-action text-primary widget-cursor border-bottom-0">' + text +'</a>';
        }
        if (type === 'Condo' && loc.Property_Type__c.includes('Condo')) {

            let link = loc.Slug__c.toLowerCase().replace(/ /g, '-').replace(/'/g, '');
            if (window.location.hostname.startsWith('search.')) {
                link = '//' + window.location.hostname.replace('search.', '') + '/' + link;
            }
            let text = loc.Subdivision_Nickname__c;
            if (subType === 'sale') {
                text += ' Condos for Sale';
                link += '-condos-sale';
            }
            if (subType === 'rent') {
                text += ' Condos for Rent';
                link += '-condos-rent';
            }
            if (subType === 'living') {
                text = 'Living at ' + text + ' Condos';
            }
            link += '?utm_source=footer-widget';
            html += '<a href="' + link + '" class="list-group-item list-group-item-action text-primary widget-cursor border-bottom-0">' + text +'</a>';
        }
        if (type === 'Townhome' && loc.Property_Type__c.includes('Townhome')) {
            let link = loc.Slug__c.toLowerCase().replace(/ /g, '-').replace(/'/g, '');
            let text = loc.Subdivision_Nickname__c;
            if (subType === 'sale') {
                text += ' Townhomes for Sale';
                link += '-townhomes-sale';
            }
            if (subType === 'rent') {
                text += ' Townhomes for Rent';
                link += '-townhomes-rent';
            }
            if (subType === 'living') {
                text = 'Living in ' + text + ' Townhomes';
            }
            html += '<a href="' + link + '" class="list-group-item list-group-item-action text-primary widget-cursor border-bottom-0">' + text +'</a>';
        }
        if (type === 'House' && loc.Property_Type__c.includes('House')) {
            let link = loc.Slug__c.toLowerCase().replace(/ /g, '-').replace(/'/g, '');
            let text = loc.Subdivision_Nickname__c;
            if (subType === 'sale') {
                text += ' Houses for Sale';
                link += '-homes-sale';
            }
            if (subType === 'rent') {
                text += ' Houses for Rent';
                link += '-homes-rent';
            }
            if (subType === 'living') {
                text = 'Living in ' + text + ' Houses';
            }
            link += '?utm_source=footer-widget';
            html += '<a href="' + link + '" class="list-group-item list-group-item-action text-primary widget-cursor border-bottom-0">' + text +'</a>';
        }

    }
    $('.list-group.list-group-flush').html(html);
}

$('.widget-popup').click(clickWidgetButton);


// load all properties
let path = 'properties.json';
if (window.location.hostname.startsWith('search.')) {
     path = '//' + window.location.hostname.replace('search.', '') + '/properties.json';
}
// console.log('path:', path);
$.ajax({
    type: "GET",
    cache: false,
    url: path,
    success: (data) => {
        localStorage.setItem("allProperties", JSON.stringify(data));
    }
});
