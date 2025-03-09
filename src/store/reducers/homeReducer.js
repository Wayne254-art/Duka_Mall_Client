import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'
import api from '../../api/api'

export const get_category = createAsyncThunk(
    'product/get_category',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/home/get-categories')
            return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_products = createAsyncThunk(
    'product/get_products',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/home/get-products')
            return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_product = createAsyncThunk(
    'product/get_product',
    async (slug, thunkAPI) => {
        try {
            const response = await api.get(`/home/get-product/${slug}`)
            console.log(response.data)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/home/price-range-latest-product')
            return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_banners = createAsyncThunk(
    'product/get_banners',
    async (_, thunkAPI) => {
        try {
            const response = await api.get('/banners')
            return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const query_products = createAsyncThunk(
    'product/query_products',
    async (query, thunkAPI) => {
        try {
            const response = await api.get(`/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''}`)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const customer_review = createAsyncThunk(
    'review/customer_review',
    async (info, thunkAPI) => {
        try {
            const response = await api.post('/home/customer/submit-review', info)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
        }
    }
)

export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async (params, thunkAPI) => {
        try {
            const response = await api.get(`/home/customer/get-reviews/${params.productId}?pageNo=${params.pageNumber}`)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
        }
    }
)

export const homeReducer = createSlice({
    name: 'home',
    initialState: {
        categorys: [],
        products: [],
        totalProduct: 0,
        parPage: 4,
        latest_product: [],
        topRated_product: [],
        discount_product: [],
        priceRange: {
            low: 0,
            high: 100
        },
        product: {},
        relatedProducts: [],
        moreProducts: [],
        successMessage: '',
        errorMessage: '',
        totalReview: 0,
        rating_review: [],
        reviews: [],
        banners: []
    },
    reducers: {
        messageClear: (state) => {
            state.successMessage = ""
            state.errorMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_category.fulfilled, (state, action) => {
                state.categorys = action.payload.categorys
            })
            .addCase(get_products.fulfilled, (state, action) => {
                state.products = action.payload.products
                state.latest_product = action.payload.latest_product
                state.topRated_product = action.payload.topRated_product
                state.discount_product = action.payload.discount_product
            })
            .addCase(get_product.fulfilled, (state, action) => {
                state.product = action.payload.product
                state.relatedProducts = action.payload.relatedProducts
                state.moreProducts = action.payload.moreProducts
            })
            .addCase(price_range_product.fulfilled, (state, action) => {
                state.latest_product = action.payload.latest_product
                state.priceRange = action.payload.priceRange
            })
            .addCase(query_products.fulfilled, (state, action) => {
                state.products = action.payload.products
                state.totalProduct = action.payload.totalProduct
                state.parPage = action.payload.parPage
            })
            .addCase(customer_review.fulfilled, (state, action) => {
                state.successMessage = action.payload.message
            })
            .addCase(get_reviews.fulfilled, (state, action) => {
                state.reviews = action.payload.reviews
                state.totalReview = action.payload.totalReview
                state.rating_review = action.payload.rating_review
            })
            .addCase(get_banners.fulfilled, (state, action) => {
                state.banners = action.payload.banners
            })
    }
})

export const { messageClear } = homeReducer.actions
export default homeReducer.reducer
