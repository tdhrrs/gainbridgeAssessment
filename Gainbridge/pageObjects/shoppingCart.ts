export class ShoppingCartPage {
    // Selectors
    private cartContainerSelector = '.cart-container';
    private logo = '.logo';
    private outOfStockSelector = '.out-of-stock';
    private removeItemSelector = '.remove-item';
    private confirmRemoveSelector = '.confirm-remove';
    private checkoutBtnSelector = '#checkoutBtn';
    private tshirt = "[data-item-id='123']";
    private totalAmountSelector = '#totalAmount';
    private quantitySelector = '.quantity';
    private navSelector = '.nav';

    getTotalAmount() {
        return this.totalAmountSelector;
    }
    getCheckoutBtn() {
        return this.checkoutBtnSelector;
    }

    getConfirmRemove() {
        return this.confirmRemoveSelector;
    }
    // Methods 
    getCart() {
        return this.cartContainerSelector;
    }

    getOutOfStock() {
        return this.outOfStockSelector;
    }

    getRemoveItem() {
        return this.removeItemSelector;
    }

    getLogo() {
        return this.logo;
    }

    getShirt() {
        return this.tshirt;
    }

    getQuantity() {
        return this.quantitySelector;
    }

    getNav() {
        return this.navSelector;
    }
}