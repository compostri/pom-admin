import React, { Component, useState } from 'react'
import { Button, Loading, useQuery } from 'react-admin'
import { ButtonBase, Dialog, DialogTitle, Grid, Table, TableBody, TableCell, TableFooter, TablePagination, TableRow } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%'
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15
      },
      '& $imageMarked': {
        opacity: 0
      },
      '& $imageTitle': {
        border: '4px solid currentColor'
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(6)}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  },
  'list-page': {
    width: '100%'
  }
})

const GridButtons = ({ onSelected, data, ...props }) => {
  const { classes } = props
  return (
    <Grid container>
      {data.map(image => {
        return (
          <Grid key={image.id} item xs={12} sm={4} style={{ marginBottom: '1rem' }}>
            <ButtonBase
              focusRipple
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: '100%',
                height: 200
              }}
              onClick={e => onSelected(image)}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.contentUrl})`,
                  backgroundSize: 'cover'
                }}
              />
              <span className={classes.imageBackdrop} />
            </ButtonBase>
          </Grid>
        )
      })}
    </Grid>
  )
}
const MediaGridButtons = withStyles(styles)(GridButtons)

const MediasList2 = ({ selectOnly, onSelected, ...props }) => {
  const [payload, setPayload] = useState({
    page: 0,
    pagination: { page: 1, perPage: 25 },
    sort: { field: 'id', order: 'DESC' }
  })

  const handleChangePage = (event, page) => {
    let p = { ...payload }
    p.page = page
    p.pagination.page = page + 1
    setPayload(p)
  }

  const handleChangeRowsPerPage = event => {
    let p = { ...payload }
    p.page = 0
    p.pagination.page = 1
    p.pagination.perPage = event.target.value
    setPayload(p)
  }

  const { data, loading, total } = useQuery({
    type: 'getList',
    resource: 'media_objects',
    payload: payload
  })

  if (loading) {
    return <Loading />
  }
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <MediaGridButtons onSelected={onSelected} data={data} />
          </TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={total}
            labelRowsPerPage={'resources.media_objects.fields.perPage'}
            rowsPerPageOptions={[10, 25, 100]}
            rowsPerPage={payload.pagination.perPage}
            page={payload.page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}

class MediasSelect extends Component {
  state = {
    error: false,
    showDialog: false
  }

  handleClick = () => this.setState({ showDialog: true })

  handleCloseClick = () => this.setState({ showDialog: false })

  handleSelectImage = id => {
    this.setState({ showDialog: false })
    this.props.onSelected(id)
  }

  render() {
    const { showDialog } = this.state
    return (
      <div id="azerty">
        <Button onClick={this.handleClick} label="ra.action.edit">
          <Edit />
        </Button>
        <Dialog fullWidth maxWidth={'md'} open={showDialog} onClose={this.handleCloseClick} aria-label="Sélection image">
          <DialogTitle>Choisir une image</DialogTitle>
          <MediasList2 onSelected={this.handleSelectImage} />
        </Dialog>
      </div>
    )
  }
}

export default MediasSelect
