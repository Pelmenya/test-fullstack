import React, { useEffect } from 'react';
import OrdersShowStore from './store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import styles from './styles.m.styl';
import Item from './components/Item';
import { orderBy } from 'lodash';

type ShowParams = {
    id: string;
};

const OrdersShow = observer(
    (): JSX.Element => {
        const { id } = useParams<ShowParams>();
        const [state] = React.useState(new OrdersShowStore());

        useEffect(() => {
            if (state.initialized) return;
            state.initialize(id);
        });

        return (
            <div className={styles.screenWrapper}>
                <div className={styles.screen}>
                    <div className={styles.items}>
                        {state.loading && <span>Loading...</span>}
                        {state.order && (
                            <div className={styles.table}>
                                <h1>Заказ №<span>{state.order.number}</span> </h1>
                                <p>состав:</p>
                                {state.order.items.map((item) => (
                                    <Item item={item} key={item.id} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

export default OrdersShow;
