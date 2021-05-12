import React from 'react';

import Toolbar from '../../UI/ToolBar/Toolbar';

const AdminHome = props => {

   

    return (
      
            <div>
                <Toolbar
                    logout={props.logout}
                    toolbarStatus={'Admin'}
                    user={props.user} />
            </div>

      
    )
}

export default AdminHome;