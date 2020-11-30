export default {
    data() {
        return {
            pagination: {
                page: 1,
                rowsPerPage: 10,
                rowsNumber: 0,
            },
            rowsOptions: [10, 20, 50, 100],
            loading: false,
            tableData: [],
            searchInfo: {},
        };
    },
    methods: {
        async getTableData(props) {
            const { page, rowsPerPage } = props.pagination
            this.loading = true
            await this.tableApi({
                page,
                pageSize: rowsPerPage,
                ...props.searchInfo
            }).then(res => {
                if (res.code == 0) {
                    this.tableData = res.data.list
                    this.pagination.rowsNumber = res.data.total
                    this.pagination.page = res.data.page
                    this.pagination.rowsPerPage = res.data.pageSize
                    this.loading = false
                }
            }).catch(() => {
                this.loading = false
            })
        }
    },
    mounted() {
        this.getTableData({
            pagination: this.pagination,
            searchInfo: this.searchInfo
        })
    }
};
