//var element = document.getElementById("grid-snap-example"); //$('#grid-snap-example'),

$(document).ready(function() {
    $(".grid>.node").each(function(i, node) {
        var x = node.style.left = 112.5 + i*300;
        var y = node.style.top = 112.5;

        var connector_sets = [$(".connector-input", node), $(".connector-output")]
        _.each(connector_sets, function(connector) {
            connector.each(function(i, connector) {
                connector.style.top = 100 + i * 25;
            });
        });

        interact(node)
            .draggable({
                snap: {
                    targets: [
                        interact.createSnapGrid({ x: 25, y: 25 })
                    ],
                    range: Infinity,
                    relativePoints: [ { x: 0, y: 0 } ],
                    offset: { x: 12.5, y: 12.5 }
                },
                //inertia: true,
                restrict: {
                    restriction: node.parentNode,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
                    endOnly: true
                }
            })
            .on('dragmove', function (event) {
                x += event.dx;
                y += event.dy;

                event.target.style.left = x;
                event.target.style.top = y;

                /* event.target.style.webkitTransform =
                    event.target.style.transform =
                        'translate(' + x + 'px, ' + y + 'px)'; */
            })
            .on('resizemove', function (event) {
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);

                // update the element's style
                target.style.width  = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
                target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
            })
            .on('tap', function (event) {
                event.currentTarget.classList.toggle('selected');
                event.preventDefault();
            })
    });
});

