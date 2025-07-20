import { isValidEmail, validateInput } from './utils.js';
import { showNotification } from './ui.js';

QUnit.module('Email Validation', () => {
    QUnit.test('should return true for valid emails', assert => {
        assert.ok(isValidEmail('test@example.com'), 'test@example.com');
        assert.ok(isValidEmail('test.name@example.co.uk'), 'test.name@example.co.uk');
    });

    QUnit.test('should return false for invalid emails', assert => {
        assert.notOk(isValidEmail('test'), 'test');
        assert.notOk(isValidEmail('test@'), 'test@');
        assert.notOk(isValidEmail('test@example'), 'test@example');
        assert.notOk(isValidEmail('test@example.'), 'test@example.');
    });
});

QUnit.module('Input Validation', () => {
    QUnit.test('should return true for valid inputs', assert => {
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.value = 'John Doe';
        assert.ok(validateInput(nameInput), 'Valid name');

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.name = 'email';
        emailInput.value = 'test@example.com';
        assert.ok(validateInput(emailInput), 'Valid email');
    });

    QUnit.test('should return false for invalid inputs', assert => {
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.name = 'name';
        nameInput.value = 'J';
        assert.notOk(validateInput(nameInput), 'Invalid name');

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.name = 'email';
        emailInput.value = 'test';
        assert.notOk(validateInput(emailInput), 'Invalid email');
    });
});

QUnit.module('UI Notification', () => {
    QUnit.test('should show a notification', assert => {
        const done = assert.async();
        showNotification('Test message', 'success');
        const notification = document.querySelector('.notification');
        assert.ok(notification, 'Notification element exists');
        assert.equal(notification.textContent, 'Test message', 'Notification has correct message');
        assert.ok(notification.classList.contains('notification-success'), 'Notification has correct class');
        setTimeout(() => {
            done();
        }, 1000);
    });
});
