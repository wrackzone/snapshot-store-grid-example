Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:{ html:'<a href="https://help.rallydev.com/apps/2.0rc2/doc/">App SDK 2.0rc2 Docs</a>'},
    launch: function() {
        
        console.log(this.getContext().getProject().ObjectID);

    	var find = {
            '_TypeHierarchy'   : { "$in" : ["HierarchicalRequirement"]} ,
            'Project' : { "$in": [this.getContext().getProject().ObjectID] },
            '__At' :             'current'
		};

        var columnCfgs = [
            {text: "Portfolio Item:", dataIndex: 'FormattedID'},
            {text: "Name:", dataIndex: 'Name'}
        ];
        var gridStore = Ext.create('Rally.data.lookback.SnapshotStore', {
            find: find,
            fetch: ['ObjectID','FormattedID','Name','_TypeHierarchy'],
            hydrate: ['_TypeHierarchy'],
            limit: 'Infinity'
        });

		this.grid = this.add({
            xtype: 'rallygrid',
            id: 'portfolioItemGrid',
            store: gridStore,
            columnCfgs: columnCfgs,
            listeners : {
                // afterlayout : {
                //     fn : function(grid, layout, eventOpts ) {
                //         for (i=0; i < grid.items.length; i++){
                //         }
                //     }
                // }
            }
        });
        this.grid.store.load();

    }
});
