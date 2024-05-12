import { driver, $, expect } from '@wdio/globals'

describe('FITUR LOGIN', function () {
	it('sebagai user saya ingin membuka halaman login', async function () {
		// selector pakai accessibility id
		await $('~View menu').click()
        // await $('id=//android.widget.ImageView[@content-desc="View menu"]').click()

		// selector pakai xpath dengan elemen utama tidak memiliki id unique
		// pilih elemen bapak terdekat yang memiliki id unique
		// pilih anak dari bapak tersebut dengan menggunakan order selector dari xpath []
		// await $('//android.view.ViewGroup[@resource-id="com.saucelabs.mydemoapp.android:id/header"]/android.widget.ImageView[2]').click()

		await driver.pause(500)

		// scroll ke bawah
		await driver
			.action('pointer')
			.move({ y: 850, x: 250 })
			.down()
			.pause(100)
			.move({ y: 500, x: 250, duration: 200 })
			.up()
			.perform()

		// pilih berdasarkan text nya pakai UiSelector
		// await $(`android=new UiSelector().text("Log In")`).click()

		// pilih berdasarkan text nya pakai XPath
		await $('//*[@text="Log In"]').click()

		const loginPageTitle = await $('id=com.saucelabs.mydemoapp.android:id/loginTV')
		await expect(loginPageTitle).toHaveText('Login')
	})

	it('login menggunakan username dan password yang valid', async function () {
		await $('id=com.saucelabs.mydemoapp.android:id/nameET').setValue('bod@example.com')
		await $('id=com.saucelabs.mydemoapp.android:id/passwordET').setValue('10203040')
		await $('id=com.saucelabs.mydemoapp.android:id/loginBtn').click()

		const productPageTitle = await $('id=com.saucelabs.mydemoapp.android:id/productTV')
		await expect(productPageTitle).toHaveText('Products')
	})

   
})

describe("Fitur Product", ()=>{
    it('Sebagai user saya ingin membuka halaman detail product', async function () {
        await $('//android.widget.ImageView[@content-desc="Sauce Labs Backpack"]').click()

        const productTitle = await $('//*[@text="Sauce Labs Backpack"]')
        await expect(productTitle).toHaveText("Sauce Labs Backpack")
    })

    it("Sebagai user saya ingin menambahkan barang ke keranjang", async function () {
        await $('//android.widget.ImageView[@resource-id="com.saucelabs.mydemoapp.android:id/start5IV"]').click()
        await $('~Closes review dialog').click()
        await $('~Blue color').click()
        // await $('//android.widget.ImageView[@content-desc="Blue color"]').click()

        await $('~Increase item quantity').click()
        await $('~Increase item quantity').click()
        const Qty = await $('//android.widget.TextView[@index="1"]')
        await expect(Qty).toHaveText('3')

        await $('//*[@text="Add to cart"]').click()

        await $('~View cart').click()
        // await $('id=00000000-0000-01b6-ffff-ffff000000b1').click()

        const productTitle = await $('id=com.saucelabs.mydemoapp.android:id/titleTV')
        const productQty = await $('//android.widget.TextView[@index="1"]')
        await expect(productTitle).toHaveText('Sauce Labs Backpack')
        await expect(productQty).toHaveText('3')  
    })

	it("Sebagai user, saya menambahkan data diri",async function(){
		await $('id=com.saucelabs.mydemoapp.android:id/cartBt').click()
		await $('id=com.saucelabs.mydemoapp.android:id/nameET').setValue('bod@example.com')
		await $('id=com.saucelabs.mydemoapp.android:id/passwordET').setValue('10203040')
		await $('id=com.saucelabs.mydemoapp.android:id/loginBtn').click()

		const pageTitle = await $('//*[@text="Enter a shipping address"]')
		await expect(pageTitle).toHaveText("Enter a shipping address")

		await $('id=com.saucelabs.mydemoapp.android:id/fullNameET').setValue('Gatot Subroto')
		await $('id=com.saucelabs.mydemoapp.android:id/address1ET').setValue('Jalan Sudirman nomor 45')
		await $('id=com.saucelabs.mydemoapp.android:id/cityET').setValue('Surabaya')
		await $('id=com.saucelabs.mydemoapp.android:id/stateET').setValue('Jawa Timur')
		await $('id=com.saucelabs.mydemoapp.android:id/zipET').setValue('66554')
		await $('id=com.saucelabs.mydemoapp.android:id/countryET').setValue('Indonesia')

		await $('~Saves user info for checkout').click()
		const pageTitle2 = await $('id=com.saucelabs.mydemoapp.android:id/enterPaymentMethodTV')
		await expect(pageTitle2).toHaveText("Enter a payment method")
	})
})

describe("FITUR PAYMENT", function(){
	it("Sebagai user, saya ingin menambahkan data payment", async function(){
		await $('id=com.saucelabs.mydemoapp.android:id/nameET').setValue("Gatot Subroto")
		await $('id=com.saucelabs.mydemoapp.android:id/cardNumberET').setValue("123456789123")
		await $('id=com.saucelabs.mydemoapp.android:id/expirationDateET').setValue("03/25")
		await $('id=com.saucelabs.mydemoapp.android:id/securityCodeET').setValue("404")

		await $('id=com.saucelabs.mydemoapp.android:id/paymentBtn').click()
		const pageTitle = await $('id=com.saucelabs.mydemoapp.android:id/enterShippingAddressTV')
		await expect(pageTitle).toHaveText('Review your order')
	})

	it("Sebagai user, saya mengulas detail pesanan saya", async function(){
		await $("id=com.saucelabs.mydemoapp.android:id/paymentBtn").click()
		const pageTitle = await $('id=com.saucelabs.mydemoapp.android:id/completeTV')
		await expect(pageTitle).toHaveText("Checkout Complete")
	})

	it("Sebagai user, saya kembali ke halaman utama", async function(){
		await $('~Tap to open catalog').click()
		const pageTitle = await $('id=com.saucelabs.mydemoapp.android:id/productTV')
		await expect(pageTitle).toHaveText('Products')
	})


})